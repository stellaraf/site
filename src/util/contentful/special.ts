import { sortByWeight, sortByTitle } from "~/util";
import { getParsedContent, getContentType } from "./common";

import type {
  FormModel,
  IDocsGroup,
  IPartnerPage,
  IContactCard,
  IDocsArticle,
  TFormModelTrial,
  IDocsGroupEntry,
  IPartnerPageEntry,
  IContactCardEntry,
  IMeasuredGeoPoint,
  TestimonialEntry,
} from "~/types";

/**
 * Get all contact cards, as pre-parsed as possible.
 */
export async function getContactCards(preview: boolean = false): Promise<IContactCard[]> {
  const contactCardEntries = await getParsedContent<IContactCardEntry>("contactCard", preview);
  /**
   * Because each contact card definition ends up being hyper-nested, it's necessary, or rather
   * ideal, to pre-parse the data instead of trying to do it in the component.
   */
  const contactCards = contactCardEntries.map(entry => {
    const { form: formEntry, ...cardEntry } = entry;
    const form = {} as FormModel<"Support" | "Sales">;

    if (typeof formEntry !== "undefined") {
      for (const [k, v] of Object.entries<unknown>(formEntry.fields)) {
        if (typeof v === "string") {
          // @ts-expect-error The model is such that each k:v pair could be string:string,
          // or string:Entry. Typescript will complain about `v` being unknown, and won't
          // accept any other type, even with extensive type guards. Therefore, while this is
          // wrong, we _know_ the structure of `formEntry.fields` can only be one of these two
          // types, therefore this is safe-ish.
          form[k] = v;
        } else {
          // @ts-expect-error Same as above. If `v` is not a string, then it must be an Entry.
          form[k] = v.fields;
        }
      }
    }
    return { form, ...cardEntry };
  });
  return contactCards;
}

/**
 * Get a partner page. Because of the stupidly complex multi-nested structure of the data for any
 * model that has a form associated, some special parsing needs to occur.
 */
export async function getPartnerPage(partner: string, preview: boolean = false): Promise<IPartnerPage["pageData"]> {
  // Get all Partner Pages matching the the partner's name.
  const matches = await getParsedContent<IPartnerPageEntry["pageData"]>("partnerPage", preview, {
    "fields.name[match]": partner,
    include: 4,
  });

  // There should only be one page per partner. Therefore, pick the first.
  const { trialForm: formEntry, ...pageEntry } = matches[0];
  const trialForm = {} as TFormModelTrial;

  if (typeof formEntry !== "undefined") {
    for (const [k, v] of Object.entries<unknown>(formEntry.fields)) {
      if (typeof v === "string") {
        // @ts-expect-error The model is such that each k:v pair could be string:string,
        // or string:Entry. Typescript will complain about `v` being unknown, and won't
        // accept any other type, even with extensive type guards. Therefore, while this is
        // wrong, we _know_ the structure of `formEntry.fields` can only be one of these two
        // types, therefore this is safe-ish.
        trialForm[k] = v;
      } else {
        // @ts-expect-error Same as above. If `v` is not a string, then it must be an Entry.
        trialForm[k] = v.fields;
      }
    }
  }

  return { trialForm, ...pageEntry };
}

/**
 * Get all Docs Groups & each of their associated articles.
 */
export async function getDocsGroups(preview: boolean = false): Promise<IDocsGroup[]> {
  const docsGroups = [] as IDocsGroup[];
  const groups = await getParsedContent<IDocsGroupEntry>("docsGroup", preview);

  for (const group of groups) {
    // Get each Docs Article where the article's associated group title matches this group.
    const unsortedItems = await getParsedContent<IDocsArticle>("docsArticle", preview, {
      "fields.docsGroup.sys.contentType.sys.id": "docsGroup",
      "fields.docsGroup.fields.title": group.title,
    });
    const items = unsortedItems.sort(sortByTitle);
    docsGroups.push({ ...group, items });
  }

  return docsGroups.sort(sortByWeight).sort(sortByTitle);
}

/**
 * Get all Orion cloud locations, pre-parse, & set default values.
 */
export const getOrionLocations = async (): Promise<IMeasuredGeoPoint[]> => {
  const data = await getContentType<IMeasuredGeoPoint>("orionLocation");
  /**
   * Add default values for cloud locations - this ensures type safety but also signals to
   * components if the location has been checked.
   */
  return data.items.map(p => ({ ...p.fields, elapsed: 65535, best: false }));
};

export async function getTestimonials(preview: boolean = false): Promise<TestimonialEntry[]> {
  const data = await getContentType<TestimonialEntry>("testimonial", preview);
  const testimonials = data.items.map(entry => entry.fields).sort(sortByTitle);
  return testimonials;
}

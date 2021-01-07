import { getParsedContent } from './common';

import type {
  FormModel,
  IPartnerPage,
  IPartnerPageEntry,
  IContactCard,
  IFormModelTrial,
  IContactCardEntry,
  THomePageContent,
} from '~/types';

export async function getContactCards(preview: boolean): Promise<IContactCard[]> {
  const contactCardEntries = await getParsedContent<IContactCardEntry>('contactCard', preview, {
    select: 'sys.id,fields',
  });
  const contactCards = contactCardEntries.map(entry => {
    const { form: formEntry, ...cardEntry } = entry;
    const form = {} as FormModel<'Support' | 'Sales'>;
    if (typeof formEntry !== 'undefined') {
      for (const [k, v] of Object.entries<unknown>(formEntry.fields)) {
        if (typeof v === 'string') {
          // @ts-expect-error it's impossible to parse this stupid thing.
          form[k] = v;
        } else {
          // @ts-expect-error it's impossible to parse this stupid thing.
          form[k] = v.fields;
        }
      }
    }
    return { form, ...cardEntry };
  });
  return contactCards;
}

export async function getPartnerPage(
  partner: string,
  preview: boolean,
): Promise<IPartnerPage['pageData']> {
  const matches = await getParsedContent<IPartnerPageEntry['pageData']>('partnerPage', preview, {
    select: 'sys.id,fields',
    'fields.name[match]': partner,
    include: 4,
  });

  const { trialForm: formEntry, ...pageEntry } = matches[0];
  const trialForm = {} as IFormModelTrial;
  if (typeof formEntry !== 'undefined') {
    for (const [k, v] of Object.entries<unknown>(formEntry.fields)) {
      if (typeof v === 'string') {
        // @ts-expect-error it's impossible to parse this stupid thing.
        trialForm[k] = v;
      } else {
        // @ts-expect-error it's impossible to parse this stupid thing.
        trialForm[k] = v.fields;
      }
    }
  }

  return { trialForm, ...pageEntry };
}

export const getHomePage = async (): Promise<THomePageContent> => {
  const pageContent = await getParsedContent<THomePageContent>('homepage');
  return pageContent[0];
};

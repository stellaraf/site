import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { AnimatedDiv } from "~/components";
import { useConfig } from "~/context";
import { GroupCard } from "./GroupCard";

export const Groups: React.FC = () => {
  const { docsGroups } = useConfig();
  const [ref, inView] = useInView({ triggerOnce: true, rootMargin: "-100px" });
  return (
    <Flex align="center" justify="center" m={4}>
      <Wrap spacing={8} ref={ref} justify="center" overflow="visible">
        {inView &&
          docsGroups.map((group, i) => (
            <WrapItem key={group.title}>
              <AnimatedDiv
                zIndex={1}
                animate={{ x: 0 }}
                key={group.title}
                initial={{ x: "100%" }}
                whileTap={{ y: "-3%" }}
                whileHover={{ y: "-3%" }}
                transition={{ delay: i * 0.075 }}
              >
                <GroupCard {...group} />
              </AnimatedDiv>
            </WrapItem>
          ))}
      </Wrap>
    </Flex>
  );
};

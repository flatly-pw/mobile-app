import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";

type AccordionItemPros = PropsWithChildren<{
  title: string;
}>;

function AccordionItem({ children, title }: AccordionItemPros): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  function toggleItem() {
    setExpanded(!expanded);
  }

  const body = <View style={styles.accordBody}>{children}</View>;

  return (
    <View style={styles.accordContainer}>
      <TouchableOpacity style={styles.accordHeader} onPress={toggleItem}>
        <Text style={styles.accordTitle}>{title}</Text>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#bbb" />
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
}

function Accordion({ title, contents }): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.container}>
        <AccordionItem title={title}>{contents}</AccordionItem>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  accordContainer: {
    paddingBottom: 4,
  },
  accordHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {},
  textSmall: {
    fontSize: 16,
  },
  seperator: {
    height: 12,
  },
});

export default Accordion;

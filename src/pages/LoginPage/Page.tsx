import { Icon, SelectInput, TextInput } from "@/components";
import { mdiAbTesting } from "@mdi/js";
import { useState } from "react";

export const LoginPage: React.FC = () => {
  const selectItems = [
    {
      value: "te1",
      label: "وان",
    },
    {
      value: "te2",
      label: "تو",
    },
    {
      value: "te3",
      label: "تری",
    },
    {
      value: "te4",
      label: "فور",
    },
    {
      value: "te5",
      label: "پنج",
    },
    {
      value: "te6",
      label: "شش",
    },
    {
      value: "te7",
      label: "هفت",
    },
    {
      value: "te8",
      label: "هشت",
    },
    {
      value: "te9",
      label: "نه",
    },
    {
      value: "te10",
      label: "ده",
    },
    {
      value: "te11",
      label: "وان",
    },
    {
      value: "te12",
      label: "تو",
    },
    {
      value: "te13",
      label: "تری",
    },
    {
      value: "te14",
      label: "فور",
    },
    {
      value: "te15",
      label: "پنج",
    },
    {
      value: "te16",
      label: "شش",
    },
    {
      value: "te17",
      label: "هفت",
    },
    {
      value: "te18",
      label: "هشت",
    },
    {
      value: "te19",
      label: "نه",
    },
    {
      value: "te20",
      label: "ده",
    },
    {
      value: "te21",
      label: "وان",
    },
    {
      value: "te22",
      label: "تو",
    },
    {
      value: "te23",
      label: "تری",
    },
    {
      value: "te24",
      label: "فور",
    },
    {
      value: "te25",
      label: "پنج",
    },
    {
      value: "te26",
      label: "شش",
    },
    {
      value: "te27",
      label: "هفت",
    },
    {
      value: "te28",
      label: "هشت",
    },
    {
      value: "te29",
      label: "نه",
    },
    {
      value: "te30",
      label: "ده",
    },
    {
      value: "te31",
      label: "وان",
    },
    {
      value: "te32",
      label: "تو",
    },
    {
      value: "te33",
      label: "تری",
    },
    {
      value: "te34",
      label: "فور",
    },
    {
      value: "te35",
      label: "پنج",
    },
    {
      value: "te36",
      label: "شش",
    },
    {
      value: "te37",
      label: "هفت",
    },
    {
      value: "te38",
      label: "هشت",
    },
    {
      value: "te39",
      label: "نه",
    },
    {
      value: "te40",
      label: "ده",
    },
    {
      value: "te41",
      label: "وان",
    },
    {
      value: "te42",
      label: "تو",
    },
    {
      value: "te43",
      label: "تری",
    },
    {
      value: "te44",
      label: "فور",
    },
    {
      value: "te45",
      label: "پنج",
    },
    {
      value: "te46",
      label: "شش",
    },
    {
      value: "te47",
      label: "هفت",
    },
    {
      value: "te48",
      label: "هشت",
    },
    {
      value: "te49",
      label: "نه",
    },
    {
      value: "te50",
      label: "ده",
    },
    {
      value: "te51",
      label: "وان",
    },
    {
      value: "te52",
      label: "تو",
    },
    {
      value: "te53",
      label: "تری",
    },
    {
      value: "te54",
      label: "فور",
    },
    {
      value: "te55",
      label: "پنج",
    },
    {
      value: "te56",
      label: "شش",
    },
    {
      value: "te57",
      label: "هفت",
    },
    {
      value: "te58",
      label: "هشت",
    },
    {
      value: "te59",
      label: "نه",
    },
    {
      value: "te60",
      label: "ده",
    },
    {
      value: "te61",
      label: "وان",
    },
    {
      value: "te62",
      label: "تو",
    },
    {
      value: "te63",
      label: "تری",
    },
    {
      value: "te64",
      label: "فور",
    },
    {
      value: "te65",
      label: "پنج",
    },
    {
      value: "te66",
      label: "شش",
    },
    {
      value: "te67",
      label: "هفت",
    },
    {
      value: "te68",
      label: "هشت",
    },
    {
      value: "te69",
      label: "نه",
    },
    {
      value: "te70",
      label: "ده",
    },
    {
      value: "te71",
      label: "وان",
    },
    {
      value: "te72",
      label: "تو",
    },
    {
      value: "te73",
      label: "تری",
    },
    {
      value: "te74",
      label: "فور",
    },
    {
      value: "te75",
      label: "پنج",
    },
    {
      value: "te76",
      label: "شش",
    },
    {
      value: "te77",
      label: "هفت",
    },
    {
      value: "te78",
      label: "هشت",
    },
    {
      value: "te79",
      label: "نه",
    },
    {
      value: "te80",
      label: "ده",
    },
    {
      value: "te81",
      label: "وان",
    },
    {
      value: "te82",
      label: "تو",
    },
    {
      value: "te83",
      label: "تری",
    },
    {
      value: "te84",
      label: "فور",
    },
    {
      value: "te85",
      label: "پنج",
    },
    {
      value: "te86",
      label: "شش",
    },
    {
      value: "te87",
      label: "هفت",
    },
    {
      value: "te88",
      label: "هشت",
    },
    {
      value: "te89",
      label: "نه",
    },
    {
      value: "te90",
      label: "ده",
    },
    {
      value: "te91",
      label: "وان",
    },
    {
      value: "te92",
      label: "تو",
    },
    {
      value: "te93",
      label: "تری",
    },
    {
      value: "te94",
      label: "فور",
    },
    {
      value: "te95",
      label: "پنج",
    },
    {
      value: "te96",
      label: "شش",
    },
    {
      value: "te97",
      label: "هفت",
    },
    {
      value: "te98",
      label: "هشت",
    },
    {
      value: "te99",
      label: "نه",
    },
    {
      value: "te100",
      label: "ده",
    },
  ];

  const [x, setX] = useState("");

  return (
    <section>
      <TextInput
        multiple
        placeholder="test"
        startSlot={<Icon data={mdiAbTesting} />}
        endSlot={<Icon data={mdiAbTesting} />}
        description="توضیح"
        feedback="فیدبک"
        label="سلام"
        size="sm"
      />
      <SelectInput
        multiple
        placeholder="test"
        startSlot={<Icon data={mdiAbTesting} />}
        endSlot={<Icon data={mdiAbTesting} />}
        description="توضیح"
        feedback="فیدبک"
        items={selectItems}
        label="سلام"
        size="sm"
      />
      <SelectInput
        multiple
        startSlot={<Icon data={mdiAbTesting} />}
        description="توضیح"
        feedback="فیدبک"
        items={selectItems}
        label="سلام"
      />
      <SelectInput
        size="lg"
        multiple
        startSlot={<Icon data={mdiAbTesting} />}
        description="توضیح"
        feedback="فیدبک"
        items={selectItems}
        label="سلام"
      />

      {/* <Text
        variant="h6"
        as="h1"
      >
        {strings.login.title}
      </Text> */}
      {/* <DateInput label="etst" /> */}
      {/* <Popover>
        <PopoverTrigger>
          <Button text="سلام" />
        </PopoverTrigger>
        <PopoverContent>
          <Text variant="body1">اهاهاها</Text>
          <Button text="سلام" />
        </PopoverContent>
      </Popover>
      <Text
        variant="h6"
        as="h1"
      >
        {strings.login.title}
      </Text> */}
      {/* <DateInput
        label="تاریخ ارسال"
        description="تاریخ ارسال رو دقیق بزنید"
        feedback="باشه"
      /> */}
    </section>
  );
};

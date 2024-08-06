import { INavSidebar } from "@/components/common/navigation-sidebar";
import { TbTextGrammar } from "react-icons/tb";
import { FaTextWidth } from "react-icons/fa";
import { GrAssistListening } from "react-icons/gr";
import { TbWritingSign } from "react-icons/tb";
import { FcReading } from "react-icons/fc";
import { CiSpeaker } from "react-icons/ci";
import { GiCardRandom } from "react-icons/gi";

export const libraryRouter: INavSidebar[] = [
  {
    label: "Grammar",
    href: "/library/grammar",
    children: [],
    icon: <TbTextGrammar />,
  },
  {
    label: "Vocabulary",
    href: "/library/vocabulary",
    children: [],
    icon: <FaTextWidth />,
  },
  {
    label: "Listening",
    href: "/library/listening",
    children: [],
    icon: <GrAssistListening />,
  },
  {
    label: "Writing",
    href: "/library/writing",
    children: [],
    icon: <TbWritingSign />,
  },
  {
    label: "Reading",
    href: "/library/reading",
    children: [],
    icon: <FcReading />,
  },
  {
    label: "Speaking",
    href: "/library/speaking",
    children: [],
    icon: <CiSpeaker />,
  },
  {
    label: "Exam",
    href: "/library/ielts",
    children: [
      {
        label: "Ielts",
        href: "/library/ielts",
        children: [],
        icon: <FcReading />,
      },
      {
        label: "Toeic",
        href: "/library/toeic",
        children: [],
        icon: <CiSpeaker />,
      },
    ],
    icon: <GiCardRandom />,
  },
];

export const chapterRouter: INavSidebar[] = [
  {
    label: "Instruction",
    href: "/chapter/instruction",
    children: [],
    icon: <TbTextGrammar />,
  },
  {
    label: "Exercise",
    href: "/chapter/exercise",
    children: [],
    icon: <FaTextWidth />,
  },
  {
    label: "Communication",
    href: "/chapter/communication",
    children: [],
    icon: <GrAssistListening />,
  },
];

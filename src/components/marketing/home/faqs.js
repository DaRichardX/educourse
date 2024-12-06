"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CaretDown as CaretDownIcon } from "@phosphor-icons/react/dist/ssr/CaretDown";
import { CaretRight as CaretRightIcon } from "@phosphor-icons/react/dist/ssr/CaretRight";
import { Question as QuestionIcon } from "@phosphor-icons/react/dist/ssr/Question";

const faqs = [
  {
    id: "FAQ-1",
    question: "How does EduCourse simplify capstone scheduling for schools?",
    answer:
      "Counselors or capstone teachers can configure the scheduling tool by setting constraints like the maximum number of students per room. Unique links are then sent to students, allowing them to select their rooms. Conflicts are resolved on a first-come, first-serve basis. With just a click, administrators can export the finalized schedule in Excel format for easy review and distribution.",
  },
  {
    id: "FAQ-2",
    question: "Is EduCourse customizable to fit my school's specific needs?",
    answer:
      "Absolutely. EduCourse offers full customization, from interface themes to capstone constraints, ensuring it adapts seamlessly to your school's specific workflows and requirements.",
  },
  {
    id: "FAQ-3",
    question:
      "What security measures are in place to protect student and staff data?",
    answer:
      "EduCourse leverages industry-grade authentication systems like Firebase to ensure that student and staff data remains secure. Regular updates and strict compliance with data protection standards further enhance security.",
  },
  {
    id: "FAQ-4",
    question:
      "How easy is it to set up and use EduCourse for administrators and teachers?",
    answer:
      "EduCourse is built with simplicity in mind. Administrators can set it up in just a few guided steps, and teachers can access tools and schedules without needing extensive training. The intuitive interface ensures that anyone can start using it right away.",
  },
];

export function Faqs() {
  return (
    <Box sx={{ bgcolor: "var(--mui-palette-background-level1)", py: "120px" }}>
      <Container maxWidth="md">
        <Stack spacing={8}>
          <Stack maxWidth="700px" sx={{ mx: "auto" }}>
            <Stack spacing={2}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Chip
                  color="primary"
                  icon={<QuestionIcon />}
                  label="FAQ"
                  variant="soft"
                />
              </Box>
              <Typography sx={{ textAlign: "center" }} variant="h3">
                Questions we get asked
              </Typography>
              <Typography color="text.secondary">
                Have another question you do not see here? Contact us by{" "}
                <Box
                  component="a"
                  href="mailto:richardtryhard070711@gmail.com"
                  sx={{ color: "inherit", textDecoration: "underline" }}
                >
                  email
                </Box>
                .
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            {faqs.map((faq) => (
              <Faq key={faq.id} {...faq} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

function Faq({ answer, question }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
        sx={{ cursor: "pointer" }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography variant="subtitle1">{question}</Typography>
          {isExpanded ? <CaretDownIcon /> : <CaretRightIcon />}
        </Stack>
        <Collapse in={isExpanded}>
          <Typography color="text.secondary" sx={{ pt: 3 }} variant="body2">
            {answer}
          </Typography>
        </Collapse>
      </Stack>
    </Card>
  );
}

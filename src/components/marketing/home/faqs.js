'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Question as QuestionIcon } from '@phosphor-icons/react/dist/ssr/Question';

const faqs = [
  {
    id: 'FAQ-1',
    question: 'What features does the capstone presentation management system offer?',
    answer:
      "Our capstone presentation management system is designed to simplify the coordination of presentations for large groups. Key features include secure student sign-ups, automated assignment of presentation times for non-sign-ups, printable attendance summaries, and user-friendly interfaces for easy navigation and management."
  },
  {
    id: 'FAQ-2',
    question: 'How do I sign up or register for the capstone presentation system?',
    answer:
      "Signing up is simple. Just visit our website and navigate to the 'Sign Up' section. You’ll need to provide your basic information and school affiliation. Once registered, you can access the system and begin using its features.",
  },
  {
    id: 'FAQ-3',
    question: 'Is the system secure and private? How is my data protected?',
    answer:
      'Yes, data security and privacy are our top priorities. The system is designed with robust security measures, including encrypted data storage and compliance with data privacy regulations. We ensure that all user data is protected and only accessible to authorized individuals.',
  },
];

export function Faqs() {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', py: '120px' }}>
      <Container maxWidth="md">
        <Stack spacing={8}>
          <Stack maxWidth="700px" sx={{ mx: 'auto' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chip color="primary" icon={<QuestionIcon />} label="FAQ" variant="soft" />
              </Box>
              <Typography sx={{ textAlign: 'center' }} variant="h3">
                Questions we get asked
              </Typography>
              <Typography color="text.secondary">
                Have another question you do not see here? Contact us by{' '}
                <Box
                  component="a"
                  href="mailto:2114489@learn.vsb.bc.ca"
                  sx={{ color: 'inherit', textDecoration: 'underline' }}
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
        sx={{ cursor: 'pointer' }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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

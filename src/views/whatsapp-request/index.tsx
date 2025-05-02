"use client";

import {
  Box,
  Checkbox,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useGetWhatsappRequests, useUpdateSentStatus } from "@src/api/whatsapp";
import Link from "next/link";
import React from "react";

const WhatsappRequestView = () => {
  const { data: whatsappRequests, isLoading } = useGetWhatsappRequests();
  const { mutateAsync: updateSentStatus } = useUpdateSentStatus();

  return (
    <Container sx={{ px: 8 }}>
      <Box py={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Whatsapp Number</TableCell>
                <TableCell>Photo Link</TableCell>
                <TableCell>Sent</TableCell>
              </TableRow>
            </TableHead>

            {!isLoading && whatsappRequests && (
              <TableBody>
                {whatsappRequests.map((request) => (
                  <TableRow
                    key={request.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{request.phone}</TableCell>
                    <TableCell>
                      <Link href={request.photo_link} target="_blank">
                        {request.photo_link}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        onChange={() => updateSentStatus(request.id)}
                        checked={request.isSent}
                        disabled={request.isSent}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default WhatsappRequestView;

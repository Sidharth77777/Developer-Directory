"use client"

import Box from '@mui/material/Box';
import DevForm from './components/DevForm';
import DevList from './components/DevList';
import { useState } from 'react';
import Footer from './components/Footer';

export default function Home() {
  const [refetch, setRefetch] = useState<boolean>(false)

  return (
    <Box>

      <DevForm setRefetch={setRefetch} />

      <DevList refetch={refetch} />

      <Footer />
      
    </Box>
  )
}
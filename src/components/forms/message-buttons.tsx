'use client';
import axios from 'axios';
import { Button } from '../ui/button';
import { revalidatePath } from 'next/cache';

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
export default function MessageButtons({ id, read }: { id: string; read: boolean }) {
  return <div></div>;
}

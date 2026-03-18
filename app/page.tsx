import i18next from 'i18next';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(`/login?lang=${i18next.language || 'vi'}`);
}

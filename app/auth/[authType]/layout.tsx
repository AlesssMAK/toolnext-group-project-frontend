// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// type Props = {
//   children: React.ReactNode;
// };

// export default function AuthLayout({ children }: Props) {
//   const router = useRouter();

//   useEffect(() => {
//     router.refresh();
//   }, [router]);

//   return <> {children}</>;
// }

// "use client";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Props {
//   children: React.ReactNode;
// }

// export default function AuthLayout({ children }: Props) {
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   useEffect(() => {
//     router.refresh();
//     setLoading(false);
//   }, [router]);
//   return <>{loading ? <div>Loading...</div> : children}</>;
// }

export const dynamic = "force-static"; // або не треба, якщо нема props

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

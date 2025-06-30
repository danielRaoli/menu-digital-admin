import BillPageClient from "./bill-page-client";

export default async function BillPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <BillPageClient contaId={id} />;
} 
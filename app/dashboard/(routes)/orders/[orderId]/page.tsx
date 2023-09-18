import prismadb from "@/_lib/prismadb";

const OrderPage = async ({
  params
}: {
  params: { orderId: number }
}) => {
  const order = await prismadb.order.findUnique({
    where: {
      id: params.orderId
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">

      </div>
    </div>
  );
}

export default OrderPage;

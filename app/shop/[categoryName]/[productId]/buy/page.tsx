import { BuyForm2 } from "../../../_components/buyForm2";
import { DownFooter } from "../../../_components/footer";
import { Navbar } from "../../../_components/navbar";
export default async function BuyPage({ params }: any) {
    const categoryName = params.categoryName;
    const productId = params.productId;
    const res = await fetch("http://localhost:3000/api/pages/home", { next: { tags: ["mainData"] } });
    const { products } = await res.json();
    console.log(products);
    const product = products.filter((p: any) => p.id == productId)[0];
    return (
        <div className="">
            <Navbar variation="withBg" />
            <div className="grid px-4 justify-center">
                <div className="bg-sd max-w-[95vw] my-2 grid border-[2px] border-gold justify-cente items-center">
                    <BuyForm2 product={product} />
                </div>
            </div>
            <DownFooter />
        </div>
    );
}




import { notEmptyString, useField, useForm } from "@shopify/react-form";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useAddBrandMutation, useAddCarMutation } from "../graphql";
import Brands from "../Components/Brands";
import Cars from "../Components/Cars";
import Input from "../Components/Input";

const AddBrand: React.FC = () => {
  const [{ fetching }, mutation] = useAddBrandMutation();

  const {
    fields: { name },
    submit,
    reset,
  } = useForm({
    fields: {
      name: useField({
        value: "",
        validates: notEmptyString("This field is required"),
      }),
    },
    onSubmit: async ({ name }) => {
      const { data } = await mutation({ name });
      if (data?.addBrand.__typename === "BrandExists")
        return {
          status: "fail",
          errors: [{ message: data.addBrand.message, field: ["name"] }],
        };
      reset();
      return { status: "success" };
    },
  });

  return (
    <form onSubmit={submit} className="py-4" name="brands">
      <div className="my-4">
        <div className="text-xs mb-1 text-gray-500 font-medium">Brands</div>
        <Brands />
      </div>
      <Input field={name} disabled={fetching} placeholder="New brand name" />
      <button className="overflow-hidden" type="submit">
        Submit
      </button>
    </form>
  );
};

const AddCar: React.FC = () => {
  const [{ fetching }, mutation] = useAddCarMutation();

  const {
    fields: { name, brandName },
    submit,
    reset,
  } = useForm({
    fields: {
      name: useField({
        value: "",
        validates: notEmptyString("This field is required"),
      }),
      brandName: useField(""),
    },
    makeCleanAfterSubmit: false,
    onSubmit: async ({ name, brandName }) => {
      const { data } = await mutation({ name, brandName });
      // if (data?.addCar.__typename === "brandNotFound")
      //   return {
      //     status: "fail",
      //     errors: [{ message: data.addCar.message, field: ["brandName"] }],
      //   };
      reset();
      return { status: "success" };
    },
  });

  return (
    <>
      <div className="my-4">
        <div className="text-xs mb-1 text-gray-500 font-medium">Cars</div>
        <Cars />
      </div>
      <form onSubmit={submit} className="flex space-x-2" name="cars">
        <div className="flex-grow">
          <Input field={name} disabled={fetching} placeholder="New car" />
        </div>
        <div className="w-1/3">
          <Input field={brandName} disabled={fetching} placeholder="Brand" />
        </div>
        <button className="overflow-hidden" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>POC - Registration of Brands and Cars</title>
        <meta
          name="description"
          content="Generated by the Inch team for teaching purposes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col justify-center">
        <h1 className="flex">
          <div className="text-3xl md:text-5xl md:text-center font-extrabold">
            POC - Registration of Brands and Cars
          </div>
        </h1>
        <AddBrand />
        <AddCar />
        <h4 className="flex">
          <div className="p-6 text-1xl md:text-2xl font-extrabold">
            Technologies Used
          </div>
        </h4>
        <p className="flex">
          <div className="p-2 text-1xl md:text-1sm font-extrabold">
            Backend: Python, PostgreSQL, FastAPI, SQLAlchemy and Strawberry GraphQL
          </div>
        </p>
        <p className="flex">
          <div className="p-2 text-1xl md:text-1sm font-extrabold">
            Frontend: TypeScript, Next.JS and GraphQL Code Generator
          </div>
        </p>
      </main>
    </div>
  );
};

export default Home;

"use client";

import React, {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import AppModal from "@/app/modals/AppModal";
import AddEditCarForm from "@/app/forms/addEditCarForm";
import DistanceForm from "@/app/forms/DistanceForm";

export default function Home() {
    const [carsArray, setCarsArray] = useState([]);

    const [addCarModal, setAddCarModal] = useState(false);
    const [activeCar, setActiveCar] = useState({_id: "", model: "", speed: 0});


  // Get car list
    const   getCarList = async () => {
        try {
            const response = await axios.get(`${process.env.BACK_URL}/api/car/car-list`);
            setCarsArray(response.data);
        } catch (e) {

        }
    }

  // Add new car
    const addCarHandler = () => {
        setAddCarModal(true);
    }

  // Edit car
  const editCarHandler = (id: string) => {
        const getActiveCar = carsArray.find((el:any) => el._id === id);
        if (getActiveCar) {
            setActiveCar(getActiveCar);
            addCarHandler();
        }
  }

  // Delete car
    const deleteCarHandler = async (id: string) => {
        try {
            const result = await axios.post(`${process.env.BACK_URL}/api/car/delete`,
                {_id: id}
            );
            result.data ? toast.success("Deleted !") : toast.info("Not deleted !");
            await getCarList();
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || "An error occurred";
            toast.error(`Error: ${message}`);
        }

    }

  //close modal
    const closeModalHandler = async () => {
        setAddCarModal(false);
        setActiveCar({_id: "", model: "", speed: 0});
        await getCarList();
    }

    // get car list on the first page load
    useEffect(() => {
        getCarList();
    }, []);

  return (
    <>
        <div className="max-w-4xl mx-auto p-10">
            <header>
                <h1 className="text-center text-5xl font-bold my-10">Car speed calculation</h1>
            </header>
            <main className="flex flex-col gap-8 items-start bg-white rounded-lg p-5">
                <button
                    onClick={addCarHandler}
                    className="pointer-events-auto rounded-md bg-green-700 px-3 py-2 text-[0.8125rem]/5 font-semibold text-white hover:bg-green-800">Add car
                </button>
                <h2>{!carsArray.length && "No cars added yet"}</h2>
                <div className="h-96 overflow-y-scroll w-full">
                    {carsArray.length && carsArray.map((car: any) => (
                        <div key={car._id} className="w-full mb-10">
                            <div className="text-4xl">{car.model}</div>
                            <div className="mt-1 mb-2"> speed: {car.speed}km/h</div>
                            <div>
                                <span className="font-bold cursor-pointer hover:underline" onClick={() => editCarHandler(car._id)}>Edit</span>
                                <span className="font-bold cursor-pointer hover:underline ml-5 text-red-800" onClick={() => deleteCarHandler(car._id)}>Delete</span>
                            </div>
                            <div>
                                <DistanceForm carId={car?._id}/>
                            </div>
                        </div>
                    ))}
                </div>

                {addCarModal && <AppModal isOpen={addCarModal} onClose={closeModalHandler} className={""} >
                    {<AddEditCarForm
                        car={{speed:activeCar.speed, model: activeCar.model, _id:activeCar._id}}
                        onClose={() => setAddCarModal(false)}
                        onRefetch={getCarList}
                    />}
                </AppModal>}
            </main>
            <ToastContainer />
        </div>
      {/*<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <Image
              className="dark:invert"
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
          />
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2">
              Get started by editing{" "}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                app/page.tsx
              </code>
              .
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
              />
              Deploy now
            </a>
            <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="/file.svg"
                alt="File icon"
                width={16}
                height={16}
            />
            Learn
          </a>
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="/window.svg"
                alt="Window icon"
                width={16}
                height={16}
            />
            Examples
          </a>
          <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
          >
            <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
            />
            Go to nextjs.org →
          </a>
        </footer>
      </div>*/}
    </>
  );
}

// @ts-ignore
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon"
import Image from "next/image";

function CreateDocRender() {
  return (
      <section className="bg-[#F8F9FA] pb-10 px-10 ">
          <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between py-6">
                  <h2 className="text-gray-700 text-lg">Start A New Muse Document</h2>
                  
                  <Button
                    color="gray"
                    buttonType="outline"
                    iconOnly={true}
                    ripple="dark"
                    className="border-0"
                  >
                    <Icon name="more_vert" size="3xl"/>
                  </Button>
              </div>

              <div className="flex items-center px-4 justify-between">
                <div className="mx-5">
                <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 rounded-xl">
                    <Image src="https://images.unsplash.com/photo-1598268641072-2f1a869b43d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=743&q=80"
                    layout="fill"
                    className="rounded-xl"/>
                </div>
                <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Scratchpad</p>
              </div>

              <div className="mx-5">
                <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 rounded-xl">
                    <Image src="https://images.unsplash.com/photo-1513666639414-f795d25747a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                    layout="fill"
                    className="rounded-xl"/>
                </div>
                <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Journal</p>
              </div>

              <div className="mx-5">
                <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700 rounded-xl">
                    <Image src="https://images.unsplash.com/photo-1586380951230-e6703d9f6833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    layout="fill"
                    className="rounded-xl"/>
                </div>
                <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">Diary</p>
              </div>
             </div>
              
          </div>
      </section>
  );
}

export default CreateDocRender;

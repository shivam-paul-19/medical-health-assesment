import Form from "./Form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const getOutput = (output) => {
    console.log(output)
}

function FormPage() {
  return (
    <>
    <Form getOutput={getOutput}/>
        
      {/* <Drawer>
      <DrawerTrigger asChild>
            <Button>
              Open
            </Button>
          </DrawerTrigger>
          <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
            <DrawerHeader>
              <DrawerTitle>Move Goal</DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="no-scrollbar overflow-y-auto px-4">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer> */}
    </>
  )
}

export default FormPage;
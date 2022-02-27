import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon"
import { signOut } from "next-auth/client";

function Header({profile_pic}) {  
  return (
    <header className="stick top-0 z-50 flex items-center px-4 py-2 shadow-md bg-white">
      <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className = "md:inline-flex h-20 w-20 border-0"
      >
       <Icon name="menu" size = "3xl"/>
      </Button>

      <Icon name="library_music" size = "4xl" color="blue" />
      <h1 className="ml-2 text-gray-700 text-xl">Muse Docs</h1>

      <div className="flex flex-grow mx-5 items-center px-8 py-2 bg-gray-100 rounded-lg 
                    focus-within:text-gray-600 focus-within:shadow-md">
           <Icon name="search" size = "3xl" color="gray"/>
           <input type="text" placeholder="Search" className="flex-grow px-5 text-sm bg-transparent outline-none"/>
      </div>
       <Button
        color="gray"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className = "ml-5 md:ml-20 h-20 w-20 border-0"
      >
       <Icon name="apps" size = "3xl" color="gray"/>
      </Button> 
      <img
        loading="lazy"
        className="cursor-pointer h-12 w-12 rounded-full ml-2"
        src= {profile_pic}
        alt="Profile Picture"
      />     
      <Button
        color="lightBlue"
        buttonType="outline"
        rounded={true}
        iconOnly={true}
        ripple="dark"
        className = "ml-1 md:ml-20 h-20 w-20 border-0"
        onClick = {() => signOut()}
      >
       <Icon name="logout" size = "3xl" color="lightBlue"/>
      </Button> 
    </header>
  );
}

export default Header;

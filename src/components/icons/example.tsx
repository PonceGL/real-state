import { FacebookIcon } from "./facebook";
import { MedalIcon } from "./medalicon";
import { MenuIcon } from "./menuicon";
import { MountainIcon } from "./mountain";
import { PencilIcon } from "./pencilicon";

export function ExampleIcons() {
    return(
        <>
            <div className="w-full ">
                <PencilIcon/>
                <MountainIcon/>
                <MenuIcon/>
                <MedalIcon/>
                <FacebookIcon/>
            </div>
        </>
    )
}
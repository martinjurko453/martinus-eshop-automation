import { IWorldOptions, setWorldConstructor, World} from "@cucumber/cucumber";
import { Context } from "../context/TestContext";

export class CustomWorld extends World {
    context: Context;

    constructor(option: IWorldOptions){
        super(option);
        this.context = new Context();
    }
}

setWorldConstructor(CustomWorld);
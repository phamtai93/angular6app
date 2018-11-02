import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

// define a special  return type for this validator function a normal synchronous validator would simply return a java script object
export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((observer: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener("loadend", () => {

    });
    fileReader.readAsArrayBuffer(file);
  });
};

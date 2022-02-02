import useFetchDataSelected from "./useFetchDataSelected";
import { updateProgressValue } from "../slices/progress";
import { Editor, Transforms } from "slate";
const SITE_KEY = "6LcA4HoaAAAAAMHEQHKWWXyoi1TaCiDgSJoy2qtP";
import { ReactEditor } from "editable-slate-react";
import { selectedText } from "./currentSelectEditor";


//fetching the data from the api and then inserting it into the editor
async function useFetchInsert(dispatch,enqueueSnackbar, editors, gtoken, url, fieldValues) {
  const selectedTextValue = selectedText(editors[0])

    const textLists = await useFetchDataSelected(
      selectedTextValue,
      gtoken,
      url,
      fieldValues
    );
    dispatch(updateProgressValue(50));
    let textOptions = Object.values(textLists);
    textOptions
      .filter((x: any) => x.search("Error 4043") != -1)
      .map((element) => enqueueSnackbar(element));
    textOptions
      .filter((x: any) => x.search("Error 4043") == -1)
      .map((text, index) =>
        Transforms.insertText(editors[index+1], text, { at: [0] })
      );
    dispatch(updateProgressValue(100));
    ReactEditor.focus(editors[0]);
    Transforms.select(editors[0], Editor.end(editors[0], []));
  }


export default useFetchInsert
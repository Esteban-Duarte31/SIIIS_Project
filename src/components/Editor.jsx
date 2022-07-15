import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useFirestoreReviews } from "../hooks/useFirestoreReviews";

import FormErrors from "./FormErrors";
import FormInputEditor from "./FormInputEditor";
import { FormValidate } from "../utils/FormValidate";
import { useForm } from "react-hook-form";

const EditorTiny = ({ dataReview1 }) => {
  console.log("a",dataReview1);
  const editorRef = useRef(null);

  // validate form with react-hook-form
  const { required } = FormValidate();
  const {
    dataReview,
    loadingReview,
    getDataReviews,
    getDataReviewUser,
    deleteDataReview,
    updateDataReview,
  } = useFirestoreReviews();

  // useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  // useState hook
  const onSubmit = async (dataUpdate) => {
    dataUpdate.content = editorRef.current.getContent();
    console.log("dataUpdate", dataUpdate);
    const dataNew = {
      ...dataReview1,
      ...dataUpdate,
    };
    // console.log(dataNew);
    try {
      await updateDataReview(dataNew);
    } catch (error) {
      console.log(error.code);
      const { code, message } = ErrorsFirebase(error.code);
      setError(code, { message });
    }
  };

  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 my-6 lg:grid-cols-2">
          <FormInputEditor
            type="text"
            // placeholder={dataReview1.title}
            value={dataReview1.title}
            label="Título"
            htmlFor="title"
            name="title"
            error={errors.title}
            {...register("title", {
              required,
            })}
          >
            <FormErrors error={errors.name} />
          </FormInputEditor>
          <FormInputEditor
            type="date"
            // placeholder={dataReview1.title}
            value={dataReview1.date}
            label="Fecha"
            htmlFor="date"
            name="date"
            error={errors.date}
            {...register("date", {
              required,
            })}
          >
            <FormErrors error={errors.name} />
          </FormInputEditor>
        </div>
        <div className="grid gap-6 my-6 ">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Descripción corta
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-amber-400 focus:border-amber-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-400 dark:focus:border-amber-400"
            placeholder="Ejemplo: 'Relata historia de machine learning desde sus inicios hasta la actualidad'"
            defaultValue={dataReview1.description}
            {...register("description", {
              required,
            })}
          ></textarea>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <label className="block text-sm font-medium text-gray-900 dark:text-gray-400">
            Contenido
          </label>
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-amber-400 text-base font-medium text-white hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Agregar
          </button>
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* -------------EDITOR----------------------------------------------------------------------------------------- */}
      <Editor
        apiKey="xa7jibfvgt9hh2wyjzamlbtt8cq0hjb0niph3zn58qelqrnh"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={dataReview1.content}
        init={{
          selector: "textarea#open-source-plugins",
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons",
          editimage_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl",
          toolbar_sticky: true,
          toolbar_sticky_offset: isSmallScreen ? 102 : 108,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          link_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],
          image_list: [
            { title: "My page 1", value: "https://www.tiny.cloud" },
            { title: "My page 2", value: "http://www.moxiecode.com" },
          ],
          image_class_list: [
            { title: "None", value: "" },
            { title: "Some class", value: "class-name" },
          ],
          importcss_append: true,
          file_picker_callback: (callback, value, meta) => {
            /* Provide file and text for the link dialog */
            if (meta.filetype === "file") {
              callback("https://www.google.com/logos/google.jpg", {
                text: "My text",
              });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === "image") {
              callback("https://www.google.com/logos/google.jpg", {
                alt: "My alt text",
              });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === "media") {
              callback("movie.mp4", {
                source2: "alt.ogg",
                poster: "https://www.google.com/logos/google.jpg",
              });
            }
          },
          templates: [
            {
              title: "New Table",
              description: "creates a new table",
              content:
                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
              title: "Starting my story",
              description: "A cure for writers block",
              content: "Once upon a time...",
            },
            {
              title: "New list with dates",
              description: "New List with dates",
              content:
                '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
          ],
          template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          height: 600,
          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image table",
          skin: useDarkMode ? "oxide-dark" : "oxide",
          content_css: useDarkMode ? "dark" : "default",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
      />

      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default EditorTiny;

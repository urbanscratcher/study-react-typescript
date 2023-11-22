import {
  useRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
  useImperativeHandle,
  forwardRef,
} from "react";

export type FormHandle = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<"form"> & {
  // don't know in advance
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function (
  { onSave, children, ...otherProps },
  ref
) {
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        console.log("Clearing..");
        form.current?.reset();
      },
    };
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={form}>
      {children}
    </form>
  );
});

export default Form;

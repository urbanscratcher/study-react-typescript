import { useRef } from "react";
import Button from "./components/Button";
import Form, { FormHandle } from "./components/Form";
import Input from "./components/Input";

function App() {
  const customForm = useRef<FormHandle>(null);

  function handleSave(data: unknown) {
    // as: convert type when better knowing what type is
    const extractedData = data as { name: string; age: string };
    console.log(extractedData);

    customForm.current?.clear();
  }

  return (
    <main>
      <Form onSave={handleSave} ref={customForm}>
        <Input type="text" label="name" id="name" />
        <Input type="number" label="age" id="age" />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
    </main>
  );
}

export default App;

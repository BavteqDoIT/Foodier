import UniversalForm from "../components/UniversalForm";
import { init } from "../util/database";

function AddProduct({ navigation }) {
  const fields = [
    { name: "name", label: "Product Name", placeholder: "e.g., Milk", required: true },
    { name: "code", label: "Code", placeholder: "Optional", required: true },
  ];

  const handleSubmit = async (data) => {
    try {
      const db = await init();
      await db.runAsync(
        `INSERT INTO products (name, code) VALUES (?, ?);`,
        [data.name, data.code]
      );
      navigation.goBack();
    } catch (err) {
      console.error("Insert failed:", err);
    }
  };

  return <UniversalForm fields={fields} onSubmit={handleSubmit} submitLabel="Save Product" />;
}

export default AddProduct;
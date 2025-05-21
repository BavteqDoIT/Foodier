import UniversalForm from "../components/UniversalForm";
import { init } from "../util/database";

function AddPlace({ navigation }) {
  const fields = [
    { name: "name", label: "Place Name", placeholder: "e.g., Fridge", required: true },
    { name: "description", label: "Description", placeholder: "Fridge downstairs", required: true },
  ];

  const handleSubmit = async (data) => {
    try {
      const db = await init();
      await db.runAsync(
        `INSERT INTO places (name, description) VALUES (?, ?);`,
        [data.name, data.description]
      );
      navigation.goBack();
    } catch (err) {
      console.error("Insert failed:", err);
    }
  };

  return <UniversalForm fields={fields} onSubmit={handleSubmit} submitLabel="Save Place" />;
}

export default AddPlace;
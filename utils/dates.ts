import { format } from "date-fns";
import fr from "date-fns/locale/fr";

export const displayDate = (input: Date) => {
	return format(input, "PPpp", { locale: fr });
};

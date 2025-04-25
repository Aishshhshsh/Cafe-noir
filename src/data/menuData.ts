
import { MenuItem } from "@/components/MenuCard";

export const breakfastItems: MenuItem[] = [
  {
    id: "b1",
    name: "Truffle Mushroom Omelette",
    description: "Three farm eggs with wild mushrooms, truffle oil, and aged Gruyère cheese.",
    price: "$16",
    ingredients: ["Farm Eggs", "Wild Mushrooms", "Truffle Oil", "Gruyère Cheese", "Fresh Herbs"],
    isChefSpecial: true,
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
    preparation: "Our eggs are sourced from a local farm and the mushrooms are foraged weekly from the nearby woods."
  },
  {
    id: "b2",
    name: "Avocado Heirloom Toast",
    description: "House-made sourdough topped with avocado spread, heirloom tomatoes, and poached eggs.",
    price: "$14",
    ingredients: ["Sourdough Bread", "Avocado", "Heirloom Tomatoes", "Poached Eggs", "Microgreens"],
    dietaryInfo: ["Vegetarian"],
  },
  {
    id: "b3",
    name: "Maple Pecan Belgian Waffles",
    description: "Crisp Belgian waffles topped with candied pecans, fresh berries, and maple-infused mascarpone.",
    price: "$15",
    ingredients: ["Waffle Sweet Batter", "Organic Pecans", "Maple Syrup", "Mascarpone", "Seasonal Berries"],
    dietaryInfo: ["Vegetarian"],
  },
  {
    id: "b4",
    name: "Smoked Salmon Benedict",
    description: "House-smoked salmon on English muffin with poached eggs, dill hollandaise, and capers.",
    price: "$18",
    ingredients: ["Smoked Salmon", "English Muffin", "Poached Eggs", "Hollandaise", "Capers", "Dill"],
  },
  {
    id: "b5",
    name: "Brioche French Toast",
    description: "Thick-cut brioche soaked in vanilla-infused custard, served with berry compote and crème fraîche.",
    price: "$16",
    ingredients: ["Brioche", "Vanilla Bean", "Eggs", "Berry Compote", "Crème Fraîche", "Mint"],
    dietaryInfo: ["Vegetarian"],
  },
  {
    id: "b6",
    name: "Harvest Grain Bowl",
    description: "Ancient grains with roasted seasonal vegetables, poached egg, avocado, and harissa yogurt.",
    price: "$15",
    ingredients: ["Quinoa", "Farro", "Seasonal Vegetables", "Poached Egg", "Avocado", "Harissa Yogurt"],
    dietaryInfo: ["Vegetarian", "Gluten-Free Option"],
  }
];

export const lunchItems: MenuItem[] = [
  {
    id: "l1",
    name: "Herb-Crusted Salmon",
    description: "Pan-seared salmon with herbed breadcrumbs, served over a warm farro salad with preserved lemon.",
    price: "$22",
    ingredients: ["Salmon", "Fresh Herbs", "Breadcrumbs", "Farro", "Preserved Lemon", "Seasonal Vegetables"],
    isChefSpecial: true,
    preparation: "Our salmon is sustainably sourced and the herbs are grown in our rooftop garden.",
    dietaryInfo: ["Low-fat Non-veg"]
  },
  {
    id: "l2",
    name: "Wild Mushroom Risotto",
    description: "Creamy Arborio rice with a blend of wild mushrooms, white wine, and shaved Parmesan.",
    price: "$19",
    ingredients: ["Arborio Rice", "Wild Mushrooms", "White Wine", "Parmesan", "Truffle Oil"],
    dietaryInfo: ["Vegetarian", "Gluten-Free"],
  },
  {
    id: "l3",
    name: "Nicoise Salad",
    description: "Classic French salad with seared ahi tuna, haricots verts, potatoes, olives, and quail eggs.",
    price: "$20",
    ingredients: ["Ahi Tuna", "Haricots Verts", "Fingerling Potatoes", "Niçoise Olives", "Quail Eggs", "Dijon Vinaigrette"],
    dietaryInfo: ["Gluten-Free"],
  },
  {
    id: "l4",
    name: "Artisanal Cheese Board",
    description: "Selection of three artisanal cheeses with house-made preserves, honey, and crostini.",
    price: "$18",
    ingredients: ["Seasonal Cheeses", "House-made Preserves", "Local Honey", "Crostini", "Candied Nuts"],
    dietaryInfo: ["Vegetarian"],
  },
  {
    id: "l5",
    name: "Croque Madame",
    description: "Classic French sandwich with ham, Gruyère, béchamel, and a fried egg on brioche.",
    price: "$17",
    ingredients: ["Brioche green field grown", "British Ham", "Gruyère", "Béchamel", "Fried Egg", "Fines Herbes"],
    dietaryInfo: ["Low-fat Non-veg"]
  },
  {
    id: "l6",
    name: "Pear & Gorgonzola Flatbread",
    description: "House-made flatbread with caramelized pears, Gorgonzola, walnuts, and honey drizzle.",
    price: "$16",
    ingredients: ["Flatbread Dough", "Pears", "Gorgonzola", "Walnuts", "Honey", "Arugula"],
    dietaryInfo: ["Vegetarian"],
  }
];

export const dinnerItems: MenuItem[] = [
  {
    id: "d1",
    name: "Braised Short Rib",
    description: "12-hour braised short rib with red wine reduction, truffle mashed potatoes, and glazed root vegetables.",
    price: "$32",
    ingredients: ["Beef Short Rib", "Red Wine", "Truffle", "Potatoes", "Root Vegetables", "Fresh Herbs"],
    isChefSpecial: true,
    preparation: "Our short ribs are braised for 12 hours and finished with a reduction made from the braising liquid."
  },
  {
    id: "d2",
    name: "Seared Scallops",
    description: "Pan-seared sea scallops with cauliflower purée, brown butter, capers, and crispy pancetta.",
    price: "$30",
    ingredients: ["Sea Scallops", "Cauliflower", "Brown Butter", "Capers", "Pancetta", "Micro Greens"],
    dietaryInfo: ["Gluten-Free"],
  },
  {
    id: "d3",
    name: "Mushroom Wellington",
    description: "Wild mushroom and chestnut pâté wrapped in puff pastry with truffle jus and seasonal vegetables.",
    price: "$26",
    ingredients: ["Wild Mushrooms", "Chestnuts", "Puff Pastry", "Truffle Jus", "Seasonal Vegetables"],
    dietaryInfo: ["Vegetarian"],
  },
  {
    id: "d4",
    name: "Duck Breast à l'Orange",
    description: "Seared duck breast with orange gastrique, celery root purée, and glazed baby carrots.",
    price: "$34",
    ingredients: ["Duck Breast", "Orange", "Celery Root", "Baby Carrots", "Star Anise", "Thyme"],
    dietaryInfo: ["Gluten-Free"],
  },
  {
    id: "d5",
    name: "Handmade Pappardelle",
    description: "Fresh pappardelle pasta with slow-cooked ragù of wild boar, sage, and aged Pecorino.",
    price: "$28",
    ingredients: ["Pappardelle", "Wild Boar", "Tomatoes", "Red Wine", "Sage", "Pecorino"],
    dietaryInfo: ["Boiled"]
  },
  {
    id: "d6",
    name: "Roasted Rack of Lamb",
    description: "Herb-crusted rack of lamb with rosemary jus, potato gratin, and minted peas.",
    price: "$36",
    ingredients: ["Rack of Lamb", "Fresh Herbs", "Potatoes", "Cream", "Peas", "Mint"],
    dietaryInfo: ["Gluten-Free"],
  }
];

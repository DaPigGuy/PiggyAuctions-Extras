export const ItemMap = {"ids": {}};

export default {
    fetchItemIdMap(callback) {
        fetch("https://raw.githubusercontent.com/pmmp/BedrockData/master/item_id_map.json").then(response => response.json()).then(data => {
            ItemMap.ids = data;
            if (callback) callback();
        });
    },
    getItemName(item) {
        let itemName = Object.keys(ItemMap.ids).find(key => ItemMap.ids[key] === item.id) || "Unknown";
        itemName = itemName.replace("minecraft:", "").replace(/_/g, " ").toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        if (item.nbt && item.nbt.value.display && item.nbt.value.display.value.Name) {
            itemName = item.nbt.value.display.value.Name.value;
        }
        return itemName;
    },
    getItemLore(item) {
        if (item.nbt && item.nbt.value.display && item.nbt.value.display.value.Lore) {
            return item.nbt.value.display.value.Lore.value.value;
        }
        return [];
    }
}
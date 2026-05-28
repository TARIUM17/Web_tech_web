import { supabaseClient } from "../services/supabase.js";

export async function addProduct(Title, Descript, img) {
    try {
        const fileExt = img.name.split('.').pop();
        const fileName = `${Title}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: storageData, error: storageError } = await supabaseClient.storage.from('Products') // bucket name
                .upload(filePath, img);

        if (storageError) {
            throw storageError;
        }

        const {data: { publicUrl }} = supabaseClient.storage.from('Products').getPublicUrl(filePath);

        const { data, error } = await supabaseClient.from('Product').insert([
            {
                name: Title,
                info: Descript,
                img_url: publicUrl
            }
        ]);

        if (error) {
            throw error;
        }
        console.log("Product created:", data);
        return data;

    } catch (error) {
        console.log(error);
    }
}
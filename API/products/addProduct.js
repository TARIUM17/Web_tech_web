import { supabaseClient } from "../services/supabase.js";

export async function addProduct(Title, Descript, img) {
    try {
        const fileExt = img.name.split('.').pop();
        const fileName = `${Title}.${fileExt}`;
        const filePath = `${fileName}`;

        {        //check
            const { data: existingProduct, error: checkError } = await supabaseClient.from('Product').select('id').eq('name', Title).maybeSingle();
            if (checkError) throw checkError;

            if (existingProduct) {
                alert("Product already exists");
                return;
            }

            const { data: files, error: checkStorageError } = await supabaseClient.storage.from('Products').list();
            if(checkStorageError) throw checkStorageError;//2
            const fileExists = files.some(file => file.name === fileName);

            if (fileExists) {
                alert("Product already exists");
                return;
            }
        }

        const { data: storageData, error: storageError } = await supabaseClient.storage.from('Products') // bucket name
                .upload(filePath, img);

        if (storageError)
            throw storageError;

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
        alert("Your example was sent. Thank you");
        return data;

    } catch (error) {
        console.log(error);
    }
}
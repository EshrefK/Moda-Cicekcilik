import { getAllCategories, createCategory, deleteCategory, getCategory, updateCategory, getAllCategoryGroups, createCategoryGroup, deleteCategoryGroup, updateCategoryGroup } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

function generateSlug(name) {
    return name.toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export default async function KategorileriYonet() {

    
    const categories = await getAllCategories();
    const groups = await getAllCategoryGroups();

    async function createCategoryAction(formData) {
        'use server'
        const name = formData.get('name');
        const groupId = formData.get('groupId');
        
        await createCategory({
            name,
            slug: generateSlug(name),
            groupId: groupId || null
        });
        
        revalidatePath('/admin/kategoriler');
    }

    async function deleteCategoryAction(formData) {
        'use server'
        const id = formData.get('id');
        await deleteCategory(id);
        revalidatePath('/admin/kategoriler');
    }

    async function updateCategoryAction(formData) {
        'use server'
        const id = formData.get('id');
        const name = formData.get('name');
        const groupId = formData.get('groupId');
        
        await updateCategory(id, {
            name,
            slug: generateSlug(name),
            groupId: groupId || null
        });
        
        revalidatePath('/admin/kategoriler');
    }

    async function createGroupAction(formData) {
        'use server'
        const name = formData.get('name');
        await createCategoryGroup({
            name,
            slug: generateSlug(name)
        });
        revalidatePath('/admin/kategoriler');
    }

    async function deleteGroupAction(formData) {
        'use server'
        const id = formData.get('id');
        await deleteCategoryGroup(id);
        revalidatePath('/admin/kategoriler');
    }

    async function updateGroupAction(formData) {
        'use server'
        const id = formData.get('id');
        const name = formData.get('name');
        await updateCategoryGroup(id, {
            name,
            slug: generateSlug(name)
        });
        revalidatePath('/admin/kategoriler');
    }

    // Group categories by their groups
    const groupedCategories = categories.reduce((acc, category) => {
        const groupName = category.group?.name || 'Ungrouped';
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(category);
        return acc;
    }, {});

    return (
        <div className="max-w-4xl mx-auto p-6 pt-20">
            <h1 className="text-2xl font-bold text-[#8B0000] mb-6">Kategorileri Yönet</h1>
            
            {/* Create Group Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Yeni Grup Ekle</h2>
                <form action={createGroupAction} className="space-y-4">
                    <div>
                        <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">Grup Adı</label>
                        <input
                            type="text"
                            name="name"
                            id="groupName"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B0000] focus:ring-[#8B0000]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#8B0000] text-white px-4 py-2 rounded-md hover:bg-[#6B0000] transition-colors"
                    >
                        Grup Ekle
                    </button>
                </form>
            </div>


            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grup Adı</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {groups.map((group) => (
                            <tr key={group.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{group.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <form action={updateGroupAction} className="flex items-center space-x-2">
                                            <input type="hidden" name="id" value={group.id} />
                                            <input
                                                type="text"
                                                name="name"
                                                defaultValue={group.name}
                                                className="px-3 py-1 border rounded-md focus:border-[#8B0000] focus:ring-[#8B0000] focus:outline-none"
                                            />
                                            <button
                                                type="submit"
                                                className="bg-[#8B0000] text-white px-4 py-1 rounded-md hover:bg-[#6B0000] transition-colors"
                                            >
                                                Güncelle
                                            </button>
                                        </form>
                                        <form action={deleteGroupAction} className="inline">
                                            <input type="hidden" name="id" value={group.id} />
                                            <button
                                                type="submit"
                                                className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors"
                                            >
                                                Sil
                                            </button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Category Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Yeni Kategori Ekle</h2>
                <form action={createCategoryAction} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Kategori Adı</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B0000] focus:ring-[#8B0000]"
                        />
                    </div>
                    <div>
                        <label htmlFor="groupId" className="block text-sm font-medium text-gray-700">Kategori Grubu</label>
                        <select
                            name="groupId"
                            id="groupId"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8B0000] focus:ring-[#8B0000]"
                        >
                            <option value="">Grup Seçin</option>
                            {groups.map((group) => (
                                <option key={group.id} value={group.id}>
                                    {group.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="bg-[#8B0000] text-white px-4 py-2 rounded-md hover:bg-[#6B0000] transition-colors"
                    >
                        Kategori Ekle
                    </button>
                </form>
            </div>

            {/* Categories Tables by Group */}
            {Object.entries(groupedCategories).map(([groupName, groupCategories]) => (
                <div key={groupName} className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="bg-gray-50 px-6 py-3 border-b">
                        <h2 className="text-lg font-semibold text-gray-900">{groupName}</h2>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori Adı</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {groupCategories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <form action={updateCategoryAction} className="flex items-center space-x-2">
                                                <input type="hidden" name="id" value={category.id} />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    defaultValue={category.name}
                                                    className="px-3 py-1 border rounded-md focus:border-[#8B0000] focus:ring-[#8B0000] focus:outline-none"
                                                />
                                                <select
                                                    name="groupId"
                                                    defaultValue={category.groupId || ""}
                                                    className="px-3 py-1 border rounded-md focus:border-[#8B0000] focus:ring-[#8B0000] focus:outline-none"
                                                >
                                                    <option value="">Grup Seçin</option>
                                                    {groups.map((group) => (
                                                        <option key={group.id} value={group.id}>
                                                            {group.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="submit"
                                                    className="bg-[#8B0000] text-white px-4 py-1 rounded-md hover:bg-[#6B0000] transition-colors"
                                                >
                                                    Güncelle
                                                </button>
                                            </form>
                                            <form action={deleteCategoryAction} className="inline">
                                                <input type="hidden" name="id" value={category.id} />
                                                <button
                                                    type="submit"
                                                    className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 transition-colors"
                                                >
                                                    Sil
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

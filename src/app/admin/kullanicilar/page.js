import { clerkClient, auth } from "@clerk/nextjs/server"
import { removeRole, setRole } from "@/app/admin/actions"

export default async function Kullanicilar() {
    const client = await clerkClient()
    const users = (await client.users.getUserList()).data;
    const { userId: currentUserId } = await auth();

    return (
        <div className="pt-20 p-8 bg-[#FFF5E6] min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-[#8B0000] mb-8">Kullanıcı Yönetimi</h1>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="grid grid-cols-4 gap-4 p-4 bg-[#8B0000] text-white font-semibold">
                        <div>Kullanıcı Adı</div>
                        <div>Email</div>
                        <div>Rol</div>
                        <div>İşlemler</div>
                    </div>
                    
                    <div className="divide-y divide-gray-200">
                        {users.map((user) => (
                            <div key={user.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-gray-50">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-[#8B0000] text-white flex items-center justify-center mr-3">
                                        {user.firstName?.[0] || user.emailAddresses[0].emailAddress[0].toUpperCase()}
                                    </div>
                                    <span className="font-medium">
                                        {user.firstName ? `${user.firstName} ${user.lastName || ''}` : 'İsimsiz Kullanıcı'}
                                    </span>
                                </div>
                                
                                <div className="flex items-center text-gray-600">
                                    {user.emailAddresses[0].emailAddress}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    {user.id === currentUserId ? (
                                        <div className="text-red-600 font-medium">Kendi rolünüzü değiştiremezsiniz</div>
                                    ) : (
                                        <>
                                            <form action={setRole}>
                                                <input type="hidden" name="userId" value={user.id} />
                                                <input type="hidden" name="role" value="admin" />
                                                <button 
                                                    type="submit"
                                                    className={`px-4 py-2 rounded-md transition-colors ${
                                                        user.publicMetadata?.role === 'admin' 
                                                            ? 'bg-[#8B0000] text-white' 
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                >
                                                    Admin
                                                </button>
                                            </form>
                                            <form action={setRole}>
                                                <input type="hidden" name="userId" value={user.id} />
                                                <input type="hidden" name="role" value="user" />
                                                <button 
                                                    type="submit"
                                                    className={`px-4 py-2 rounded-md transition-colors ${
                                                        user.publicMetadata?.role === 'user' 
                                                            ? 'bg-[#8B0000] text-white' 
                                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                    }`}
                                                >
                                                    Kullanıcı
                                                </button>
                                            </form>
                                        </>
                                    )}
                                </div>
                                
                                <div className="flex items-center">
                                    {user.id === currentUserId ? (
                                        <div className="text-red-600 font-medium">Kendi rolünüzü değiştiremezsiniz</div>
                                    ) : (
                                        <form action={removeRole}>
                                            <input type="hidden" name="userId" value={user.id} />
                                            <button 
                                                type="submit"
                                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                            >
                                                Rol Kaldır
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

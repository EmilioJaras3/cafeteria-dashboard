
export function SearchBar({ textoAyuda, nombre = "busqueda", valorPorDefecto }: { textoAyuda: string; nombre?: string; valorPorDefecto?: string }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                name={nombre}
                defaultValue={valorPorDefecto}
                placeholder={textoAyuda}
                className="w-full md:w-80 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 font-medium"
            />
            <button type="submit" className="hidden" />
        </div>
    );
}

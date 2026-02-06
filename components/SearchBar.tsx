export function SearchBar({ placeholder, name = "q", defaultValue }: { placeholder: string; name?: string; defaultValue?: string }) {
    return (
        <div className="mb-4">
            <input
                type="text"
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                className="w-full md:w-80 p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 font-medium"
            />
            {/* Hidden submit button to allow Enter key */}
            <button type="submit" className="hidden" />
        </div>
    );
}

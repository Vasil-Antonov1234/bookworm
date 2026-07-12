export function prepareCategoryOptions(book) {
    const options = ["Novel", "Poetry", "Biography", "Non-Fiction", "Short Story"];

    const selectOptions = options.map((x) => ({
        value:  categoryValueHandler(x),
        title: x,
        selected: book.category === categoryValueHandler(x) ? "selected" : ""
    }));
    return selectOptions;
};

function categoryValueHandler(string) {
    
    return string.toLocaleLowerCase().replaceAll(" ", "-");
};
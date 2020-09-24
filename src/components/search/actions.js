export const SEARCH_UPDATE_INPUT = "SEARCH / UPDATE_INPUT";
export const SEARCH_UPDATE_SUGGESTIONS = "SEARCH / UPDATE_SUGGESTIONS";

export const updateSearchInput = (value) => ({
    type: SEARCH_UPDATE_INPUT,
    payload: value
});

export const updateSearchSuggestions = (data) => ({
    type: SEARCH_UPDATE_SUGGESTIONS,
    payload: data
});
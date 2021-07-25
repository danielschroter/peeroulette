import React from 'react';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
            // Default transform is "translate(14px, 20px) scale(1)""
            // This lines up the label with the initial cursor position in the input
            // after changing its padding-left.
            transform: "translate(34px, 20px) scale(1);",
            color: "white",
        },
        "& .MuiInputLabel-outlined.MuiInputLabel-shrink":{
            color: "white",
        }
    },
    inputRoot: {
        color: "white",
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            // Default left padding is 6px
            paddingLeft: 26
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
            padding: 20,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "orange"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        }
    }
}));

export default function AppointmentSearchComponent(props) {
    const classes = useStyles();

    const [searchTags, setSearchTags] = React.useState([]);



    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                classes={classes}
                id="tags-outlined"
                options={allInterests}
                onChange={(event, value) => props.onChangeSearchInterests(value)}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Search your interests"
                        placeholder="Search for Tags"
                    />
                )}
            />
        </div>
    );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const allInterests = ["Business and Industry", "Advertising", "Agriculture", "Architecture", "Aviation", "Banking", "Investment banking",
    "Online banking", "Retail banking", "Business", "Construction", "Design", "Fashion design", "Graphic design", "Interior design", "Economics", "Engineering", "Entrepreneurship", "Health care",
    "Higher education", "Management", "Marketing", "Nursing", "Online", "Digital marketing",
    "Display advertising", "Email marketing", "Online advertising", "Search engine optimization", "Social media", "Social media marketing",
    "Web design", "Web development", "Web hosting", "Personal finance", "Creditcards", "Insurance", "Investment", "Mortgage loans", "Real estate",
    "Retail", "Sales", "Science", "Small business", "Entertainment", "Games", "Action games", "Board games",
    "Browser games", "Card games", "Casino games", "First-person shooter games", "Gambling", "Massively multiplayer online games", "Massively multiplayer online role-playing games",
    "Online games", "Online poker", "Puzzle video games", "Racing games", "Role-playing games", "Shooter games", "Simulation games", "Sports games", "Strategy games", "Video games",
    "Word games", "Live events", "Ballet", "Bars", "Concerts", "Dancehalls", "Music festivals", "Nightclubs", "Parties", "Plays", "Theatre", "Movies", "Action movies",
    "Animated movies", "Anime movies", "Bollywood movies", "Comedy movies", "Documentary movies", "Drama movies", "Fantasy movies", "Horror movies", "Musical theatre", "Science fiction movies",
    "Thriller movies", "Music", "Blues music", "Classical music", "Country music", "Dance music", "Electronic music", "Gospel music",
    "Heavy metal music", "Hip hop music", "Jazz music", "Music videos", "Pop music", "Rhythm and blues music", "Rock musicSoul music", "Reading", "Books",
    "Comics", "E-books", "Fiction books", "Literature", "Magazines", "Manga", "Mystery fiction", "Newspapers",
    "Non-fiction books", "Romance novels", "TV", "TV comedies", "TV game shows", "TV reality shows", "TV talkshows", "Family and relationships",
    "Dating", "Family", "Fatherhood", "Friendship", "Marriage", "Motherhood", "Parenting", "Weddings", "Fitness and wellness",
    "Bodybuilding", "Meditation", "Physical exercise", "Physical fitness", "Running", "Weight training", "Yoga", "Food and drink", "Alcoholic beverages", "Beer",
    "Distilled beverage", "Wine", "Beverages", "Coffee", "Energy drinks", "Juice", "Soft drinks", "Tea", "Cooking", "Baking",
    "Recipes", "Cuisine", "Chinese cuisine", "French cuisine", "German cuisine", "Greek cuisine", "Indian cuisine", "Italian cuisine", "Japanese cuisine", "Korean cuisine", "Latin American cuisine",
    "Mexican cuisine", "Middle Eastern cuisine", "Spanish cuisine", "Thai cuisine", "Vietnamese cuisine", "Food", "Barbecue", "Chocolate", "Desserts", "Fast food",
    "Organic food", "Pizza", "Seafood", "Veganism", "Vegetarianism", "Restaurants", "Coffeehouses",
    "Diners", "Fast casual restaurants", "Fast food restaurants", "Hobbies and activities", "Arts and music", "Acting",
    "Crafts", "Dance", "Drawing", "Drums", "Fine art", "Guitar", "Painting", "Performing arts", "Photography", "Sculpture", "Singing", "Writing", "Current events",
    "Home and garden", "Do it yourself (DIY)", "Furniture", "Gardening", "Home Appliances", "Home improvement", "Pets", "Birds", "Cats", "Dogs", "Fish", "Horses", "Pet food",
    "Rabbits", "Reptiles", "Politics and social issues", "Charity and causes", "Community issues",
    "Environmentalism", "Law", "Military", "Politics", "Religion", "Sustainability", "Veterans", "Volunteering", "Travel", "Adventure travel", "Air travel", "Beaches",
    "Car rentals", "Cruises", "Ecotourism", "Hotels", "Lakes", "Mountains", "Nature", "Theme parks", "Tourism", "Vacations",
    "Vehicles", "Automobiles", "Boats", "Electric vehicle", "Hybrids", "Minivans", "Motorcycles", "RVs", "SUVs", "Scooters", "Trucks", "Shopping and fashion", "Beauty", "Beauty salons", "Cosmetics", "Fragrances",
    "Hair products", "Spas", "Tattoos", "Clothing", "Children’s clothing", "Men’s clothing", "Shoes", "Women’s clothing", "Fashionaccessories", "Dresses", "Handbags", "Jewelry",
    "Sunglasses", "Shopping", "Boutiques", "Coupons", "Discount stores", "Luxury goods", "Online shopping", "Shopping malls", "Toys", "Sports and outdoors", "Outdoor recreation", "Boating", "Camping", "Fishing",
    "Horseback riding", "Hunting", "Mountain biking", "Surfing", "Sports", "American football", "Association football (Soccer)", "Auto racing", "Baseball", "Basketball", "College football", "Golf", "Marathons",
    "Skiing", "Snowboarding", "Swimming", "Tennis", "Thriathlons", "Volleyball", "Technology", "Computers", "Computer memory", "Computer monitors", "Computer processors", "Computer servers", "Desktop computers", "Free software", "Hard drives", "Network storage", "Software", "Tablet computers",
    "Consumer electronics", "Audio equipment", "Camcorders", "Cameras", "E-book readers", "GPS devices", "Game consoles", "Mobile phones", "Portable media players", "Projectors", "Smartphones", "Televisions",
];

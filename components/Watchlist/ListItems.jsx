import React from "react";

const ListItem = (props) => {
  var year = props.year;
  year = year.slice(0, 4);
  var genre = props.genre.join(", ");
  var listName = props.listName.toUpperCase();

  return (
    <div class="listItem" value={props.id} onClick={props.closeWatchlist}>
      <img class="watchImg" src={props.poster}></img>
      <div class="content_title">
        {props.title} ({year})
      </div>
      <div class="contentDetail">
        Rated {props.rating} | {props.runtime} min{" "}
      </div>
      <button class="removeBtn" onClick={props.removeItem} value={props.id}>
        REMOVE
      </button>
    </div>
  );
};

const ListItems = (props) => {
  var list = props.content.slice(props.index, props.index + 4);
  var Items = list.map((item) => (
    <ListItem
      id={item.id}
      title={item.title}
      poster={item.poster}
      type={item.type}
      year={item.release_date}
      genre={item.genre_names}
      rating={item.us_rating}
      runtime={item.runtime_minutes}
      removeItem={props.removeItem}
      listName={props.listName}
      listName={props.listName}
      // displaySelectedTitle={props.displaySelectedTitle}
      closeWatchlist={props.closeWatchlist}
    />
  ));

  return <div class="listContainer">{Items}</div>;
};

export default ListItems;

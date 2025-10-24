function shareOnSocial(socialPlatform, header, description) {
  let shareUrl;
  const encodedStart = encodeURIComponent(
    "Делитесь своими бессмысленными заметками вместе с нами!"
  );
  const encodedHeader = encodeURIComponent(header);
  const encodedDescription = encodeURIComponent(description);
  const encodedCloser = encodeURIComponent(
    "Stradalets зачем-то добавил эту функциональность в свою лабораторную работу. Вот ему делать нечего..."
  );

  switch (socialPlatform) {
    case "vk":
      shareUrl =
        "https://vk.com/share.php?text=" +
        encodedHeader +
        "%20" +
        encodedDescription; //Оно не работает, т.к. поле комментария пустое. Я старался
      break;
    case "tg":
      shareUrl =
        "https://t.me/share/url?url=" +
        encodedStart +
        "&text=" +
        encodedHeader +
        " " +
        encodedDescription +
        "%0A" +
        encodedCloser;
      break;
    case "wp":
      shareUrl =
        "https://api.whatsapp.com/send?text=" +
        encodedHeader +
        "%20" +
        encodedDescription;
      break;
    case "fc":
      shareUrl =
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodedHeader +
        "&quote=" +
        encodedDescription;
      break;
    default:
      return;
  }
  window.open(shareUrl, "_blank");
}
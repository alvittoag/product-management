const Input = ({
  classLabel,
  title,
  type,
  style,
  classInput,
  nameInput,
  placeHolder,
  valueName,
  handleChange,
  checkedName,
  refs,
}) => {
  return (
    <>
      <label className={classLabel}>{title}</label>
      <input
        type={type}
        required
        onChange={handleChange}
        ref={refs && refs}
        value={valueName}
        style={style && style}
        name={nameInput && nameInput}
        placeholder={placeHolder && placeHolder}
        className={classInput}
        checked={checkedName && checkedName}
      />
    </>
  );
};

export default Input;

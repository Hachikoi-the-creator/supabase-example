export default function InputField(props) {
  const { prepopulate, type, name, defaultValue, reference } = props;

  return (
    <>
      <label htmlFor={name}>{name}</label>
      {prepopulate && (
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={`enteruy a ${name}`}
          ref={reference}
        />
      )}
      {!prepopulate && (
        <input type={type} placeholder={`enter a ${name}`} ref={reference} />
      )}
    </>
  );
}

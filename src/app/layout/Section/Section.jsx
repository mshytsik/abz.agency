import './Section.scss';

const Section = ({ id = '', children }) => {
  return (
    <section className="section" id={id ?? null}>
      {children}
    </section>
  );
};

export default Section;

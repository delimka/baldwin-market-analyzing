type SectionTitleProps = {
  text1: string;
  text2: string;
  text3: string;
};

export default function SectionTitle({
  text1,
  text2,
  text3,
}: SectionTitleProps) {
  return (
    <>
      <p className="text-center text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {text1}
      </p>

      <h3 className="mt-3 text-3xl font-semibold tracking-tight text-center">
        {text2}
      </h3>

      <p className="mt-3 text-sm text-muted-foreground text-center max-w-2xl mx-auto sm:text-base">
        {text3}
      </p>
    </>
  );
}

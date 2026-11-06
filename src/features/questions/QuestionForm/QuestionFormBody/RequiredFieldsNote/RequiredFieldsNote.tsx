export function RequiredFieldsNote() {
  return (
    <p className="text-small bg-selected rounded-control p-3 m-0">
      Campos com <span className="text-danger">*</span> são obrigatórios. Os demais estão
      identificados como (opcional).
    </p>
  );
}

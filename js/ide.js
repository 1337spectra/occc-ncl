document.addEventListener("DOMContentLoaded", function () {
  const defaultTheme = "monokai";
  const defaultMode = "assembly_x86";

  const editor = ace.edit("ace-editor");
  editor.setTheme(`ace/theme/${defaultTheme}`);
  editor.getSession().setMode(`ace/mode/${defaultMode}`);

  document.getElementById("ace-mode").addEventListener("change", (e) => {
    const mode = e.target.value.toLowerCase();
    editor.getSession().setMode(`ace/mode/${mode}`);
  });

  document.getElementById("ace-theme").addEventListener("change", (e) => {
    const theme = e.target.value.toLowerCase();
    editor.setTheme(`ace/theme/${theme}`);
  });
});

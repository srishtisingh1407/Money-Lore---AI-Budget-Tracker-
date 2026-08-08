import os

file_path = "frontend/src/app/dashboard/page.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Backgrounds
content = content.replace("bg-[#050505]", "bg-background")
content = content.replace("bg-[#0C0C0C]", "bg-card shadow-sm")
content = content.replace("bg-[#111]", "bg-gray-100")

# Text colors
content = content.replace("text-[#F5F5F5]", "text-foreground")
content = content.replace("text-[#8A8A8A]", "text-muted-foreground")
content = content.replace("text-[#FF2DAA]", "text-primary")
content = content.replace("text-[#FF4DB8]", "text-primary hover:text-green-800")
content = content.replace("text-white", "text-primary-foreground")

# Borders
content = content.replace("border-[rgba(255,255,255,0.08)]", "border-border")
content = content.replace("border-[rgba(255,255,255,0.05)]", "border-gray-100")
content = content.replace("border-[#FF2DAA]", "border-primary")
content = content.replace("border-[#rgba(255,45,170,0.15)]", "border-primary/20")

# Fills and highlights
content = content.replace("bg-[#FF2DAA]", "bg-primary")
content = content.replace("hover:bg-[#FF4DB8]", "hover:bg-primary/90")
content = content.replace("bg-[rgba(255,45,170,0.05)]", "bg-secondary")
content = content.replace("rgba(255, 45, 170, 0.1)", "rgba(46, 82, 69, 0.1)")
content = content.replace("rgba(255, 45, 170, 0.08)", "rgba(46, 82, 69, 0.08)")
content = content.replace("stroke=\"#FF2DAA\"", "stroke=\"#2E5245\"")
content = content.replace("fill=\"#FF2DAA\"", "fill=\"#2E5245\"")

# Dark mode remnants
content = content.replace("bg-black/60", "bg-black/40")
content = content.replace("bg-transparent", "bg-transparent text-foreground")
content = content.replace("glow-box", "shadow-sm")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Colors updated in dashboard/page.tsx")

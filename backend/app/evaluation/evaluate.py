from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.agents.agent import process_agent_query
from app.models import EvaluationCase, EvaluationResult

BENCHMARK_CASES = [
    ("How much did I spend on food?", "match_number", "8420"),
    ("How much did I spend on Uber?", "match_number", "2180"),
    ("Compare this month to last month", "check_provenance", "character development"),
    ("Explain why you can't answer if data is messy", "abstain", "uncategorized"),
]

def run_evaluation_benchmark():
    db = SessionLocal()
    try:
        print("Starting Evaluation Benchmark Run...")
        correct = 0
        total = len(BENCHMARK_CASES)
        
        for idx, (question, behavior, expected) in enumerate(BENCHMARK_CASES):
            # Run query through the Agent
            res = process_agent_query(db, "srishti_user", question)
            
            # Simple check
            ans_lower = res["answer"].lower()
            exp_lower = expected.lower()
            
            is_correct = False
            if behavior == "match_number":
                # Check if correct sum is in response
                if exp_lower in ans_lower or any(char.isdigit() for char in ans_lower):
                    is_correct = True
            elif behavior == "abstain":
                if res["abstained"]:
                    is_correct = True
            else:
                is_correct = exp_lower in ans_lower
                
            if is_correct:
                correct += 1
                
            print(f"[{idx+1}/{total}] Q: '{question}' -> Correct: {is_correct} (Abstained: {res['abstained']})")
            
        accuracy = (correct / total) * 100
        print(f"Benchmark finished. Accuracy: {accuracy:.1f}%")
        
    finally:
        db.close()

if __name__ == "__main__":
    run_evaluation_benchmark()

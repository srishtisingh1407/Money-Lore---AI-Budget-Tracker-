# Engineering Decisions & Failed Approaches

## Attempt 1: Let LLM categorize everything
- **Problem**: Inconsistent category labeling, high latency, and budget consumption. The AI would create synonyms (e.g. "Dining" vs "Food Delivery") instead of sticking to standard buckets.
- **Solution**: Implemented user-defined shortcuts and regex keywords as Tier 1 and 2, reserving LLM queries only as a last resort.

## Attempt 2: Direct SQL generation from Agent
- **Problem**: Security vulnerabilities (SQL injection) and arithmetic mistakes made by the LLM when summarizing.
- **Solution**: Defined schema-compliant agent tools that retrieve validated, structured inputs rather than executing raw queries.

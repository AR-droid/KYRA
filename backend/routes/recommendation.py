from models import Item, User, Swap, Session
from sqlalchemy import func
import numpy as np
from datetime import datetime

class RecommendationService:
    def __init__(self):
        self.session = Session()

    def calculate_durability_score(self, item):
        """Score durability based on condition and duration."""
        condition_weights = {'new': 1.0, 'like-new': 0.9, 'good': 0.7, 'fair': 0.5, 'worn': 0.3}
        age_months = (datetime.now() - item.purchase_date).days / 30.0 if item.purchase_date else 0
        condition_score = condition_weights.get(item.condition, 0.5)
        durability = condition_score * max(0, 1 - (age_months / item.duration_months if item.duration_months else 1))
        return min(1.0, durability)

    def get_user_preferences(self, user_id):
        """Infer user interests from owned and swapped items."""
        user = self.session.query(User).get(user_id)
        owned_cats = [item.category for item in user.items]
        swapped_cats = [swap.item.category for swap in user.swaps_requested if swap.status == 'completed']
        return list(set(owned_cats + swapped_cats))

    def recommend_items(self, user_id, limit=5):
        """Generate personalized item recommendations."""
        user = self.session.query(User).get(user_id)
        if not user:
            return []

        preferences = self.get_user_preferences(user_id)
        current_time = datetime.now()

        # Query available items (excluding user's own)
        items = self.session.query(Item).filter(
            Item.is_available == True,
            Item.owner_id != user_id
        ).all()

        recommendations = []
        for item in items:
            score = 0.0
            weight_sum = 0.0

            # Weight 1: Category match 
            cat_match = 1.0 if item.category in preferences else 0.3
            score += cat_match * 0.3
            weight_sum += 0.3

            # Weight 2: Color preference 
            owned_colors = [i.color for i in user.items if i.color]
            color_match = 1.0 if item.color in owned_colors else 0.5
            score += color_match * 0.2
            weight_sum += 0.2

            # Weight 3: Brand preference
            owned_brands = [i.brand for i in user.items if i.brand]
            brand_match = 1.0 if item.brand in owned_brands else 0.6
            score += brand_match * 0.2
            weight_sum += 0.2

            # Weight 4: Durability
            durability = self.calculate_durability_score(item)
            score += durability * 0.15
            weight_sum += 0.15

            # Weight 5: Time of buying 
            time_diff = (current_time - item.purchase_date).days if item.purchase_date else 365
            time_factor = max(0, 1 - (time_diff / 365))  # Decay over 1 year
            score += time_factor * 0.15
            weight_sum += 0.15

            if weight_sum > 0:
                score /= weight_sum
            recommendations.append((item, score))

       
        recommendations.sort(key=lambda x: x[1], reverse=True)
        return [item for item, _ in recommendations[:limit]]

    def __del__(self):
        self.session.close()

if __name__ == "__main__":
    service = RecommendationService()
    recs = service.recommend_items(1) 
    for item in recs:
        print(f"Recommended: {item.title}, Score: {service.calculate_durability_score(item):.2f}")